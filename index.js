$(document).ready(addFormEventHandler)

function addFormEventHandler (){
  $('form#artist-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderSongs()
}

function findAndRenderSongs(){
  const URL = 'https://itunes.apple.com/search?term='
  let $input = $('input#query')
  let userInput = $input.val()
  let query = userInput.split(' ').join('+')
  $input.val('')


  $.ajax({
    url: `${URL}${query}`,
    dataType: 'JSONP',
    success: renderSongs
  })
}

function renderSongs (data){
  let songList = $('.js--song-list')
  songList.html('')

  function renderSong (song) {
    let title = song.trackName
    let link = song.previewUrl
    songList.append(`<a href=${link} target="_blank" <li class='collection-item'>${title}</li> </a>`)
  }

  data.results.forEach(renderSong)
}
