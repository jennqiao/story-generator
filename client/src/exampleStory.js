let story = {
  "0": {
    "image": 'https://source.unsplash.com/800x450/?closet',
    "text": 'Once upon a time there was a child named ${this.state.name} who heard a noise in the closet.',
    "children": [
      {
        "buttonText": 'Go explore the closet',
        "pageId": '1a' 
      },
      {
        "buttonText": 'Tell someone about the noise',
        "pageId": '1b' 
      }
    ]
  },
  "1a": {
    "image": 'https://source.unsplash.com/800x450/?imaginary,world',
    "text": `She decided to explore. When she opened the closet, she couldn't believe her eyes. It led to a new world! She then heard the noise again, but it sounded more like "help! help!"`,
    "children": [
      {
        "buttonText": 'Go left',
        "pageId": '2a' 
      },
      {
        "buttonText": 'Go right',
        "pageId": '2b' 
      }
    ]
  },
  "1b": {
    "image": 'https://source.unsplash.com/800x450/?parents',
    "text": 'She decided to try to tell someone, but no adults would listen. They kept saying, "${this.state.name}, stop imagining things".',
    "children": [
      {
        "buttonText": 'Explore it yourself',
        "pageId": '1a' 
      },
    ]
  },

}

export default story;