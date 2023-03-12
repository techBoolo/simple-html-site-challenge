let timeout = null

document.getElementById('search-input').addEventListener('keyup', async (e) => {
    // Search comments

    // it might be inefficient to send a request for each key strok if the
    // user types fast, instead we send a request when the user delays typing for some
    // time in this case 200ms
    clearTimeout(timeout)
  
    timeout = setTimeout(async () => {
      // grab user input
      const searchTerm = e.target.value

      // this is for testing by sending a direct request to the api, without php
      // proxy
      // const res = await fetch('https://jsonplaceholder.typicode.com/comments?postId=3')

      // for this example we can use the
      // php/public/index.php as our endpoint, specified in server.php
      const res = await fetch('http://localhost:8000/php/public/index.php')
      const json = await res.json()

      const filteredResult = json.filter(comment => {
        // create regular expression for the user input, we assume the search is
        // case insensitive, and we want to remove spaces at the begining and end
        // and we replace multiple space user entered by a single space.
        const st = searchTerm.trim().replaceAll(/\s+/g, ' ')
        const regexp = new RegExp(st, 'i')
        const res =  regexp.test(comment.name)
        return res
      })

      // this will result in a single empty list element for empty array
      // const result = `<li>${filteredResult.map(r => r.name).join('</li><li>')}</li>`
      
      // list result replaced with
      const result = filteredResult.map(r => `<li>${r.name}</li>`).join('')
      document.getElementById('results').innerHTML = result

    }, 200)
})
