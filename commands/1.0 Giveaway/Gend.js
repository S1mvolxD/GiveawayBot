module.exports = [{
    name: "gend",
    code: `
$editMessage[$message[1];{newEmbed:{title:Розыгрыш закончен.} {description:
    Организатор: <@!$getMessageVar[host;$message[1]]>
    Приз: **$getMessageVar[prize;$message[1]]**
Победитель(ли): $if[$get[random]==;Нет победителя (нет участника);$get[random]]} {color:$getVar[color]}};$channelID]
$SendMessage[$if[$get[random]!=;Поздравляю $get[random] 
Ты победил **$getMessageVar[prize;$message[1]]**;Недостаточно участников]]

$let[random;$djsEval[
var arrayy = "$getReactions[$channelID;$message[1];🎉;true;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = $getMessageVar[win;$message[1]]
while (u != 0 && array.length > 0) {
let r = Math.floor(Math.random()*array.length); 
win += "<@!"+array[r]+">" + " "
array.splice(array.indexOf(array[r]), 1)

u = u - 1

}
win.split(" ").filter(function(a) {
return a!='<@!undefined>' && a != ''
}).join(", ")
;true]]
$onlyIf[$getMessage[$channelID;$message[1]]!=Раздача завершена!;Предоставленный идентификатор раздачи уже закончился или недействителен]
$onlyIf[$message[1]!=;Дайте действительный идентификатор сообщения]

$onlyPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять сообщениями"}{color:Red}}]
$onlyPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять каналами"}{color:Red}}]

$onlyClientPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять каналами"}{color:Red}}]
$onlyClientPerms[addreactions;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Добалять реакции"}{color:Red}}]
$onlyClientPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять сообщениями"}{color:Red}}]
$suppressErrors`
}]