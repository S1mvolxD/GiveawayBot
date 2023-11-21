module.exports = [{
    name: "giveaway",
    prototype: "slash",
    $if: "old",
    type: "interaction",
    code: `
    $if[slashOption[канал]!=]
    $setMessageVar[host;$authorID;$get[id]]
    $setMessageVar[win;$slashOption[победители];$get[id]]
    $setMessageVar[time;$slashOption[продолжительность];$get[id]]
    $setMessageVar[date;$dateStamp;$get[id]]
    $setMessageVar[prize;$slashOption[приз];$get[id]]

    $interactionReply[;{newEmbed:{title:Начало розыгрыша!}{description:}};;;everyone;true]`
}]