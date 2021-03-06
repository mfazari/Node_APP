/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Debashis Barman (http://www.debashisbarman.in)
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
    var TWITTER_CONSUMER_KEY = 'N7KMv4kAyyUGx5kqzfLqAyJ5W';
    var TWITTER_CONSUMER_SECRET = 'Bt99VhJrInU5KDuQussAw8738Ztl7Ds0wfsR28q5MnsBZKcESV';
    var TWITTER_ACCESS_TOKEN = '1045652205448179713-e9aZNvNCWBdSh3ZTmRiJ7He9Hm3LH9';
    var TWITTER_ACCESS_TOKEN_SECRET = 'Mm5ytWr1srVRNkrRL5fu1tzcuiuWMyok6rqqiQwxP7emd';




/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#technology OR #design';

var Twit = require('twit');

var Bot = new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN, 
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
    Bot.post('statuses/retweet/:id', { id: '669520341815836672' }, BotInitiated);
    
    function BotInitiated (error, data, response) {
        if (error) {
            console.log('Bot could not be initiated, : ' + error);
        }
        else {
            console.log('Bot initiated : 669520341815836672');
        }
    }
    
    BotRetweet();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

    var query = {
        q: TWITTER_SEARCH_PHRASE,
        result_type: "recent"
    }

    Bot.get('search/tweets', query, BotGotLatestTweet);

    function BotGotLatestTweet (error, data, response) {
        if (error) {
            console.log('Bot could not find latest tweet, : ' + error);
        }
        else {
            var id = {
                
                id : data.statuses[0].id_str
            }

            Bot.post('statuses/retweet/:id', id, BotRetweeted);
            
            function BotRetweeted(error, response) {
                if (error) {
                    console.log('Bot could not retweet, : ' + error);
                }
                else {
                    console.log('Bot retweeted : ' + id.id);
                }
            }
        }
    }
}

/* Set an interval of 30 minutes (in microsecondes) */
setInterval(BotRetweet, 30*60*1000);

/* Initiate the Bot */
BotInit();