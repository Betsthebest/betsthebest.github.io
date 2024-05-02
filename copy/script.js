var $_GET = {};
let button = '<button class="btn" onclick="copyContent()">Copier</button>'
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   .replace(/^.*?\?/, '')
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}
var div = document.getElementById("ctn");
let text = $_GET["tocopy"]
if (!text) div.innerHTML += "Pas de texte à copier"; else div.innerHTML += '<p>'+ text +'</p><br>'+button
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text.replace("point", "."));
    console.log('Contenu copié dans le presse papier');
    div.innerHTML = div.innerHTML.replace(button, "Copié dans le<br>presse papier");
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}