import { type NextRequest } from 'next/server'
import { parse } from 'node-html-parser';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('url');

    let data = {}
    let recipe = {}

    if (query) {
        const res = await fetch(query);
        const html = await res.text();
        const root = parse(html);
        const recipe = root.querySelector('script[type="application/ld+json"]');
        data = recipe ? JSON.parse(recipe.text) : {};
    }

    if ('@type' in data && data['@type'] == 'Recipe') {
        recipe = data
    } else if ('@graph' in data && Array.isArray(data['@graph'])) {
        [...data['@graph']].forEach(
            markup => { 
                if (markup['@type'] == 'Recipe') {
                    recipe = markup
                }
            }
        );
    }

    return Response.json({data: recipe});
}
 