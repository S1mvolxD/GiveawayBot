module.exports = [{
    name: "giveaway",
//    aliases: "gstart",
    code: `
    $setMessageVar[host;$authorID;$get[id]]
    $setMessageVar[win;$message[2];$get[id]]
    $setMessageVar[time;$message[1];$get[id]]
    $setMessageVar[date;$dateStamp;$get[id]]
    $setMessageVar[prize;$messageSlice[2];$get[id]]

    $setTimeout[gw;$get[sc]s;{
        "cid":"$channelID",
        "date":"$dateStamp",
        "time":"$message[1]",
        "host":"$authorID",
        "win":"$message[2]",
        "mid":"$get[id]",
        "prize":"$messageSlice[2]"
        }]

    $let[sc;$splitText[1]$textSplit[$math[$get[p]/1000];.]]
    $let[id;$sendMessage[
        {reactions:🎉} 
        {newEmbed:
            {title:Начало розыгрыша.}
            {description:
                • Окончание: <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R> (<t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:D>)
                • Организатор: <@!$authorID>
                • Приз: **$messageSlice[2]**
                • Победители: **$message[2]**} 
{color:$getVar[color]}};true]]
    
    $onlyIf[$messageSlice[2]!=;{newEmbed:{title:Ошибка}{description:**Приз должен быть вручен**
    **Правильное использование: **
    \`$getGuildVar[prefix]gstart [время] [победители] [приз]\`}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $onlyIf[$isNumber[$message[2]]==true;{newEmbed:{title:Ошибка}{description:**Указанный победитель должен быть номером и выше 0**
    **Правильное использование: **
    \`$getGuildVar[prefix]gstart [время] [победители] [приз]\`}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]

    $onlyIf[$get[p]!=-1;{newEmbed:{title:Ошибка}{description:**Указанное время недействительно, пожалуйста, укажите правильное время, например**
        \`1s, 1m, 1h, 1d\`** Правильное использование: **
        \`$getGuildVar[prefix]gstart [время] [победители] [приз]\`}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $let[p;$parseTime[$if[$message[1]!=;$message[1];1s10ms]]]

    $onlyPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять сообщениями"}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $onlyPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять каналами"}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]

    $onlyClientPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять каналами"}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $onlyClientPerms[addreactions;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Добалять реакции"}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $onlyClientPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять сообщениями"}{color:Red}{footer:Ошибка ~ $username[$authorID]:$authorAvatar}}]
    $suppressErrors
    `
},{
    name: "gw",
    type: "timeout",
    code: `
    $editMessage[$timeoutData[mid];{newEmbed:{title:Розыгрыш закончен.} {description:
        • Закончилось: <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R> (<t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:D>)
        • Организатор: <@!$timeoutData[host]>
        • Приз: **$timeoutData[prize]**
        • Победитель(ли): $if[$get[random]==;Нет победителя **(нет участника)**;$get[random]]} {color:$getVar[color]}};$timeoutData[cid]]
        
        $channelSendMessage[$timeoutData[cid];$if[$get[random]!=;
        Поздравляю $get[random] Ты победил **$timeoutData[prize]**;Недостаточно участников]]
        
        $let[random;$djsEval[
        var arrayy = "$getReactions[$timeoutData[cid];$timeoutData[mid];🎉;true;id]".split(",")
        arrayy.splice(arrayy.indexOf("$clientId"),1)
        var array = arrayy
        var win = ""
        let u = $timeoutData[win]
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
        $onlyIf[$getMessage[$timeoutData[cid];$timeoutData[mid]]!=Раздача завершена!;]
        $suppressErrors
    `
}]