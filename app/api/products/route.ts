export async function GET() {
 return fetch('https://deisishop.pythonanywhere.com/products/')
        .then(res => res.json())
        .then(data => Response.json(data))
        .catch(error => console.error('Erro ao carregar produtos:', error));
}