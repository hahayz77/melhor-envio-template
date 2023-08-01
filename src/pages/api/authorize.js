export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Perform the redirect
    // console.log("GET METHOD AUTHORIZE ROUTE")
    // console.log(process.env.AUTHORIZATION_URL);
    return res.redirect(307, process.env.AUTHORIZATION_URL);
  }
}
