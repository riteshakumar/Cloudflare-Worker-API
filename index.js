/*Author: Ritesh Kumar
  Time: 04/13/20
  Worker URL: https://intern_project.my-intern.workers.dev/
 */
/*Response  Listener*/
addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })

/**
 * Respond with irl variants text
 * @param {Request} request
 */
async function handleRequest(request) {
const url ='https://cfw-takehome.developers.workers.dev/api/variants';  
	return fetch(url)
		.then(response => {
			if (response.status === 200) {
				/*Requirement 1: Parsing response as JSON*/
        return response.json()
			} else {
        return response.text()
        console.log(response)
			  throw new Error('Something went wrong on api server!');
			}
		})
		.then(response => {
	  console.debug(response);
			/*Requirement 2: Make a fetch request to one of the two URLs, and return it as the response from the script*/
			/*Requirement 3: A/B testing style implementation to return each variant around 50% of the time.*/
			return fetchAndModify(response.variants[Math.floor(Math.random() < 0.5 ? '0':'1')])
		}).catch(error => {  
			console.error(error);
		});
}

/*For Modyfing DOM elements at runtime */
async function fetchAndModify(request) {
	// Send the request on to the origin server.
	const response = await fetch(request);
  
	// Read response body.
	const text = await response.text();
  
	// Modify it.
	/*Extra Credit 1: Changing copy/URLs - changing the values inside of the variant, adding own text or URLs*/
	const modified = text.replace("Variant 1","Welcome 1!").replace("Variant 2","Welcome 2!")
	.replace("Return to cloudflare.com","Return to riteshakumar.com").replace("https://cloudflare.com","https://riteshakumar.com")
	.replace("This is variant one of the take home project!","Welcome to my Webpage 1")
	.replace("This is variant two of the take home project!","Welcome to my Webpage 2")
	.replace("Variant 1","Webpage 1").replace("Variant 2","Webpage 2");
  
	// Return modified response.
	return new Response(modified, {
	  status: response.status,
	  statusText: response.statusText,
	  headers: response.headers
	});
}