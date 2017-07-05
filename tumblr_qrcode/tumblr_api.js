
var tumblr = require('./lib/tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'D4mU0lKcnWpswSeKYjGgdKq8AQuKImyWiR0gOoWDMygO5VGVbe',
  consumer_secret: 'fGRvU7XfofMM9dorIWJPqh7U74kX29NiZZJtaYkbfMMASn8V3w',
  token: 'DQDjQkCm3HMaJkkQhZQJPonBz3UNRAIExbR7iGhwpdXH89Hz2f',
  token_secret: '1BFxcrZwjHVCnFgPVPZhDU77KYIGPGjKWXvfmqcylbSroKA1nG'
});

// Make the request
client.userInfo(function (err, data) {
    console.log(err);
    data.user.blogs.forEach(function(blog) {
	    console.log(blog.name);
	});
});

var param = 
{
	source : 'https://68.media.tumblr.com/9b73aafcb5a61c2a996a6480b76fbffc/tumblr_oje9irYOno1w2tmzvo1_1280.jpg',
	caption: 'ppp',
};

client.createPhotoPost('aleksandrviktorovlove.tumblr.com', param, function(err, json) {
      console.log(err);
      console.log(json);
    }
);
