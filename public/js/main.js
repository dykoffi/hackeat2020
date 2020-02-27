
var fond

$(document).ready(() => {
    newFunction(500)
    moment.locale('fr')
    $("#date").text(moment().format('dddd, Do MMMM YYYY'))

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
            socket.emit("check", $("#focus").val())
            newFunction()
            ev.preventDefault()
        }
    })

    socket.on("checkOk", (data) => {
        $("#id").text(data.participant.info.id)
        $("#nom").text(`${data.participant.info.prenom} ${data.participant.info.nom}`)
        $("#equipe").text(data.participant.info.equipe)
        $("#personn").effect("shake")


        $("#platTotal").text(data.participant.bilan.plat_total)
        $("#platConsomme").text(data.participant.bilan.plat_conso)
        $("#platRestant").text(data.participant.bilan.plat_restant)
        $("#platImprevu").text(data.participant.bilan.plat_imprevu)

        $("#msg").text("Peut être servi")
        $("#msg").css({
            'color': "green"
        })
        $("#butManger").attr("disabled", "none")
        newFunction(100)
    })

    socket.on("checkBad", () => {

        $("#id").text("null")
        $("#nom").text("null")
        $("#equipe").text("null")
        $("#personn").effect("shake")

        $("#platTotal").text()
        $("#platConsomme").text()
        $("#platRestant").text()
        $("#platImprevu").text()

        $("#msg").text("Ne peut être servi")
        $("#msg").css({
            'color': "red"
        })
        $("#butManger").attr("disabled", "true")
        newFunction(100)
    })
})

function newFunction(delay) {
    if(fond){
        fond.appendTo("body")
        fond.fadeIn()
        fond = null
    }else{
        $('#fond').delay(delay).fadeOut(700, () => {
            fond = $('#fond').detach()
         })
    }
   
}
