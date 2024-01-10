import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.TENSOR_API_KEY;

  if (!apiKey) {
    console.error("check environment variables for TENSOR_API_KEY");
    return new NextResponse('Internal server error', { status: 500 });
  }

  const GRAPHQL_QUERY = {
    query: `query CollectionStats($slug: String!) {
      instrumentTV2(slug: $slug) {
        id 
        slug 
        slugDisplay 
        statsV2 {
          buyNowPrice
        }
      }
    }`,
    variables: {
      slug: "05c52d84-2e49-4ed9-a473-b43cab41e777", // Tensorians
    },
  };

  try {
    const response = await fetch('https://api.tensor.so/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TENSOR-API-KEY': apiKey, 
      },
      body: JSON.stringify(GRAPHQL_QUERY),
    });

    if (!response.ok) {
      throw new Error(`Error from external API: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      return new NextResponse(data.errors[0].message, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }

    const RESPONSE_HEADERS = {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=60',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    
    return new NextResponse(JSON.stringify(data), { status: 200, headers: RESPONSE_HEADERS });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data: ${error.message}`);
      return new NextResponse('Internal server error', { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return new NextResponse('Internal server error', { status: 500 });
    }
  }
}
