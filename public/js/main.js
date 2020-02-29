var fond
moment.locale('fr')
const jour = moment().format("dddd")
const per = periode()
$("#per").text(per)

$(document).ready(() => {
    document.getElementById("butManger").disabled = true

    newFunction(500)
    document.addEventListener("contextmenu", (ev) => {
        ev.preventDefault()
    })

    document.addEventListener("keydown", (ev) => {
        ev.preventDefault()
    })
    var focus = document.getElementById("focus")
    focus.addEventListener("keydown", (ev) => {
        ev.stopPropagation()

    })
    focus.addEventListener("keydown", (ev) => {
        if (ev.key == "Enter") {
            socket.emit("check",jour, per, $("#focus").val())
            newFunction()
            ev.preventDefault()
        }
    })

    socket.on("checkOk", (data) => {
        $("#id").text(data.participant.info.id)
        $("#nom").text(`${data.participant.info.prenom} ${data.participant.info.nom}`)
        $("#equipe").text(data.participant.info.equipe)
        $("#personn").effect("shake")


        $("#platTotal").text(data.participant.stats.plat_total)
        $("#platConsomme").text(data.participant.stats.plat_conso)
        $("#platRestant").text(data.participant.stats.plat_restant)
        $("#platImprevu").text(data.participant.stats.plat_imprevu)

        $("#msg").text("Peut être servi")
        $("#msg").css({
            'color': "green"
        })
        document.getElementById("butManger").disabled = false

        newFunction(100)
    })
    socket.on("checkOkcant", (data) => {
        $("#id").text(data.participant.info.id)
        $("#nom").text(`${data.participant.info.prenom} ${data.participant.info.nom}`)
        $("#equipe").text(data.participant.info.equipe)
        $("#personn").effect("shake")


        $("#platTotal").text(data.participant.stats.plat_total)
        $("#platConsomme").text(data.participant.stats.plat_conso)
        $("#platRestant").text(data.participant.stats.plat_restant)
        $("#platImprevu").text(data.participant.stats.plat_imprevu)

        $("#msg").text("A déja mangé")
        $("#msg").css({
            'color': "blue"
        })
        document.getElementById("butManger").disabled = true

        newFunction(100)
    })
    socket.on("validOk", (msg) => {
        newFunction(100)
        $("#msg").text(msg)
        $("#msg").css({
            'color': "green"
        })
        newFunction(100)
    })
    socket.on("validBad", (msg) => {
        $("#msg").text(msg)
        $("#msg").css({
            'color': "red"
        })
        newFunction(100)
    })

    socket.on("checkBad", () => {

        $("#id").text("null")
        $("#nom").text("null")
        $("#equipe").text("null")
        $("#personn").effect("shake")

        $("#platTotal").text("")
        $("#platConsomme").text("")
        $("#platRestant").text("")
        $("#platImprevu").text("")

        $("#msg").text("Identifiant incorrect")
        $("#msg").css({
            'color': "red"
        })
        document.getElementById("butManger").disabled = true
        newFunction(100)
    })

    $("#butManger").click(()=>{
        socket.emit("valider",jour, per, $("#focus").val())
        newFunction()
    })
})

function newFunction(delay) {
    if (fond) {
        fond.appendTo("body")
        fond.fadeIn()
        fond = null
    } else {
        $('#fond').delay(delay).fadeOut(700, () => {
            fond = $('#fond').detach()
        })
    }

}


function periode() {
    let heure = parseInt(moment().format("HH"))
    if(heure >= 5 && heure <= 10){
        return "matin"
    }else if(heure >= 11 && heure <= 14){
        return "midi"
    }else if(heure >= 16 && heure <= 21){
        return "soir"
    }
}
