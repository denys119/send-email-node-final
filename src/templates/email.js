module.exports = (firstName, lastName, message) => {
  return `
    <p>
      Hello, I'm <span style="background: yellow;">${firstName} ${lastName} </span>
    </p>
    <br />
    <p>
      My message is ${message}
    </p>
  `
}