const favouriteDeleter = (location) => {

  let favstars = document.querySelectorAll('.favstar')
  let friendheart = document.querySelectorAll('.friendheart')

  let path = location.pathname.slice(1, 7)

  if (path !== "office") {
    favstars.forEach(child => child.remove())
    friendheart.forEach(child => child.remove())
  }

}

export default favouriteDeleter