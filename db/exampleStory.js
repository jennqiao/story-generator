{
  "0": {
    "image": "https://s3.us-east-2.amazonaws.com/storygenerator/bedroomWithModel.jpg",
    "leftPosition": 225,
    "topPosition": 75,
    "text": "\"Once upon a time, there was a young girl named ${this.state.name}. She loved to daydream and often would dream that she was a superhero and saving the world from an evil monster. One day, as she was playing around in her bedroom, she hears a sound coming from the closet.\"",
    "children": [
      {
        "buttonText": "Go explore the closet",
        "pageId": "1a"
      },
      {
        "buttonText": "Tell your mom about the noise.",
        "pageId": "1b"
      }
    ]
  },
  "1a": {
    "image": "https://s3.us-east-2.amazonaws.com/storygenerator/1a.png",
    "leftPosition": 0,
    "topPosition": 0,
    "text": "\"${this.state.name} decides to check out the sound. She timidly opens the doors of her closet, and to her surprise, all her clothes have been replaced by a whole new world. This new world is gray and cloudy. The voice is louder and sounds like “Help! Help!”",
    "children": [
      {
        "buttonText": "Go left towards the forest.",
        "pageId": "2a"
      },
      {
        "buttonText": "Go right towards the river.",
        "pageId": "2b"
      }
    ]
  },
  "1b": {
    "image": "https://s3.us-east-2.amazonaws.com/storygenerator/1b.png",
    "leftPosition": 296,
    "topPosition": 130,
    "text": "\"${this.state.name} decides to tell her mom. But her mom does not hear a sound and tells her she is just being silly. Despite her curiosity, ${this.state.name} decides not to explore the noise and the noise eventually fades away. She never hears the mysterious noise ever again. The end.\"",
    "children": [
      {
        "buttonText": "Start over",
        "pageId": "0"
      }
    ]
  }
}