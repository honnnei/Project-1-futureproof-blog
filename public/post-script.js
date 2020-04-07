$( document ).ready(function() {

    let maxCharacters = 10;
    let textAreaLength = $('textarea').text().length;
    $('textarea').on( "keypress", function(textAreaLength, maxCharacters) {
        if (textAreaLength >= maxCharacters) {
            console.log('over limit');
        } else { 
            console.log('Below character limit');
        }
    })
});