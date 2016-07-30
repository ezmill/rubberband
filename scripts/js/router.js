var currentProject = "";
var router = new Navigo(root = "http://localhost:8888/2016/rubberband", useHash=false);
router
.on("/" + projects[0].route, function(){
  setContent(projects[0]);
})
.on("/" + projects[1].route, function(){
  setContent(projects[1]);
})
.on("/" + projects[2].route, function(){
  setContent(projects[2]);
})
.on("/" + projects[3].route, function(){
  setContent(projects[3]);
})
.on("/" + projects[4].route, function(){
  setContent(projects[4]);
})
.on("/" + projects[5].route, function(){
  setContent(projects[5]);
})
.on("/" + projects[6].route, function(){
  setContent(projects[6]);
})
.on("/" + projects[7].route, function(){
  setContent(projects[7]);
})
.resolve();
var projectActive = false;
function setContent(proj){
  console.log(proj);
    // $(".pt-page-current").removeClass("pt-page-current")
    $("#project").prepend(createIframe(proj["url"]));
    $("#description > h3").html(proj["title"]);
    // $("#project-title > h1").html(src["title"].toUpperCase());
  // }
  // $(".pt-page-current").append(createIframe(src["iframe-src"]));
  // if(!projectActive){
    console.log("TEST");
    $("#project").fadeIn();    
    // $("#project iframe").attr("src", proj["url"]);
  // }
  // projectActive = true;
}
$("#project").click(function(){
  // if(projectActive){
    $("#project").find("iframe").remove();
    $("#project").fadeOut();    
  // }  
    router.navigate('./');

  // projectActive = false;
})

function createIframe(url){
  var iframe = document.createElement("iframe");
  iframe.width = "640";
  iframe.height = "487";
  iframe.frameborder = 0;
  // // iframe.style["z-index"] = -1;
  // iframe.style.position = "absolute";
  // iframe.style.top = "0";
  // iframe.style.left = "0";
  iframe.style.border = "0";
  iframe.src = url; 
  return iframe;
}
