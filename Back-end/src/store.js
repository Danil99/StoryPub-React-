export default {
  searchName: [],
  likes: [
    {
      id: 'ALDFJONASD',
      users: ['Danil']
    },
    {
      id: 'LAJdfoiamhd',
      users: ['Max']
    },
    {
      id: 'ADLFJaADFLK',
      users: ['Danil']
    },
    {
      id: 'AJDFSDFSDFMU',
      users: ['Danil', 'Max']
    },
    {
      id: 'AJDFFMNKJFMU',
      users: ['Danil', 'Max']
    }
  ],
  commentsList: [
    {
      id: 'ALDFJONASD',
      comments: [
        {
          author: "Danil",
          comment: "Oo my god!"
        }
      ]
    },
    {
      id: 'LAJdfoiamhd',
      comments: [
        {
          author: "Katrin",
          comment: "Oo my god!"
        },
        {
          author: "Max",
          comment: "This is very good!"
        }
      ]
    },
    {
      id: 'ADLFJaADFLK',
      comments: [
        {
          author: "Max",
          comment: "This is very good!"
        },
        {
          author: "Katrin",
          comment: "Oo my god!"
        }
      ]
    },
    {
      id: 'AJDFSDFSDFMU',
      comments: [
        {
          author: "Max",
          comment: "Выпускной..!"
        }
      ]
    },
    {
      id: 'AJDFFMNKJFMU',
      comments: [
        {
          author: "murmarru",
          comment: "Ладно, я вас услышал и подровнял бороду. 👌"
        },
        {
          author: "pavlinkaa.s",
          comment: "This is very good!"
        }
      ]
    }
  ],
  users: [
    {
      user_data: {
        username: 'Danil',
        password: 'qwerty',
        email: 'Danil.nktel@gmail.com',
        avatar: 'https://scontent-waw1-1.cdninstagram.com/t51.2885-19/s150x150/13706931_655074144649376_2107901594_a.jpg',
        resolveAvatar: false,
        serverAvatar: '../Front-end/public/images/avatar/danil_ava.jpg',
        friends: ['Max']
      },
      posts: [
        {
          id: 'ALDFJONASD',
          image: "https://images.unsplash.com/photo-1469173479606-ada03df615ac?dpr=0.8999999761581421&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
          serverPath: 'https://images.unsplash.com/photo-1469173479606-ada03df615ac?dpr=0.8999999761581421&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=',
          title: "#loftschool",
          author_post: {
            username: "Danil",
            avatar: "https://scontent-waw1-1.cdninstagram.com/t51.2885-19/s150x150/13706931_655074144649376_2107901594_a.jpg"
          },
          date: 1498653942042
        },
        {
          id: 'LAJdfoiamhd',
          image: "https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/19121993_138001063441606_4823445090284339200_n.jpg",
          title: "Wylsacom",
          author_post: {
            username: "Danil",
            avatar: "https://scontent-waw1-1.cdninstagram.com/t51.2885-19/s150x150/13706931_655074144649376_2107901594_a.jpg"
          },
          date: 1498653937689
        },
        {
          id: 'ADLFJaADFLK',
          image: "https://scontent-frt3-2.cdninstagram.com/t51.2885-15/e35/19428879_1698137407148729_3962299165274275840_n.jpg",
          title: "irene_dyomina777",
          author_post: {
            username: "Danil",
            avatar: "https://scontent-waw1-1.cdninstagram.com/t51.2885-19/s150x150/13706931_655074144649376_2107901594_a.jpg"
          },
          date: 1498653938858
        }
      ]
    },
    {
      user_data: {
        username: 'Max',
        password: 'qwe',
        email: 'Max@gmail.com',
        avatar: 'https://scontent-waw1-1.cdninstagram.com/t51.2885-15/e35/19534108_1712220175473427_5636703676132229120_n.jpg',
        resolveAvatar: false,
        serverAvatar: 'https://scontent-waw1-1.cdninstagram.com/t51.2885-15/e35/19534108_1712220175473427_5636703676132229120_n.jpg',
        friends: ['Danil']
      },
      posts: [
        {
          id: 'AJDFSDFSDFMU',
          image: "https://scontent-waw1-1.cdninstagram.com/t51.2885-15/e35/19534108_1712220175473427_5636703676132229120_n.jpg",
          title: "",
          author_post: {
            username: "Max",
            avatar: "https://scontent-waw1-1.cdninstagram.com/t51.2885-15/e35/19534108_1712220175473427_5636703676132229120_n.jpg"
          },
          date: 1498653940946
        }
      ]
    }
  ]
}
