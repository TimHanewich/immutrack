var url:string = window.location.href;
var asurl = new URL(url);
var case_guid:string = asurl.searchParams.get("id") as string;
console.log("ID to process: " + case_guid);

var post_to_move: string = "https://prod-56.westus.logic.azure.com:443/workflows/b0385cfc0112490a9ce947e9070ed06c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Jyc-qnVJbBEfnTGOR7YlmGxm8Jq_hdLVMpKJIMa19J4";
//post_to_move = "https://webhook.site/128fed9f-8d6e-48c0-b1f2-b9fec2e4657d";
var topost:object = {"case": case_guid};
var topost_str:string = JSON.stringify(topost);
var req:XMLHttpRequest = new XMLHttpRequest();
req.open("post", post_to_move);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("Access-Control-Allow-Origin", "*");
req.onreadystatechange = function()
{
    if (req.readyState == 4)
    {
        if (req.status == 202)
        {
            (document.getElementById("redirecting") as HTMLElement).innerText = "We will now redirect you to the registration portal...";
            setTimeout(DoTheRedirect, 2000);
        }
        else
        {
            console.log("That was not accepted!");
            console.log("Response: " + req.status);
            console.log("Response body: " + req.responseText);
        }
        
    }
}
req.send(topost_str);

function DoTheRedirect()
{
    window.location.href = "https://vaccinate.ne.gov/en-US/";
}