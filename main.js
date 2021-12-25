function bebrochka() {
    let link = `kizn.fun/zoom?code=${document.getElementById('identificator').value}&psswd=${document.getElementById('code').value}`
    document.getElementById('generated').innerHTML = 
    `<a href='https://${link}'>${link}</a>`;
    document.getElementById('copy').style.display = 'block';
}

function copy() {
    let text = 'https://' + document.getElementById('generated').innerText;
    navigator.clipboard.writeText(text).then(function () {
        // nothing
    }, function () {
        alert('Ошибка при копировании. Разрешите сайту копировать текст в настройках браузера.')
    });
}

let searchParams = new URLSearchParams(location.search)

let identificator = searchParams?.get('code');
let password = searchParams?.get('psswd');

if (identificator != undefined && password != undefined) {
    let link = (navigator.userAgentData?.mobile ? 'zoomus' : 'zoommtg') + `://zoom.us/join?confno=${identificator}&pwd=${password}&uname=`
    document.body.innerHTML = `Если переадресация не произошла, нажмите <a href='${link}'>сюда</a>`;
    location.replace(link);
}