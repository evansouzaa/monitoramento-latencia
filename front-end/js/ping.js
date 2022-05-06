function statusSirene(sirene, ip) {

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    const time = setInterval(() => {
        httpRequest('https://localhost:3001/ping', { "host": ip })
    }, 10000);

    function stopTime() {
        alert("Ops! Algo deu errado...")
        clearInterval(time)
    }

    function defStatus(sirene, ping) {
        const status = document.querySelector(`#${sirene}`)
        if (ping.alive === false) {
            status.classList.add('sirene-offline')
            status.classList.remove('sirene-online')
        }
        if (ping.alive === true) {
            status.classList.add('sirene-online')
            status.classList.remove('sirene-offline')
        }
    }

    function httpRequest(url, obj) {
        (async() => {
            try {
                const rawResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });
                const ping = await rawResponse.json();
                defStatus(sirene, ping)

            } catch (erro) {
                console.log(erro)
                stopTime()
            }
        })();
    }

}

const sirenes = document.querySelectorAll('.sirene')

sirenes.forEach((element, index) => {
    setTimeout(function() {
        statusSirene(element.id, element.getAttribute('ip'))
    }, index * 100)
});