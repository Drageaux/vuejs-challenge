/**
 * Created by David on 4/2/2017.
 */
$("form button").click(function (e) {
    e.preventDefault();
});

var giphyUrl = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=pg&limit=30&q=';

new Vue({
    el: '#app',
    data: {
        message: 'Hallo Werld!',
        input: '',
        resultList: [],
        savedList: []
    },
    methods: {
        searchGiphy: function (keyword) {
            // example API call: http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
            var self = this;
            // do ajax
            if (keyword) {
                self.resultList = [];
                $.get(giphyUrl + keyword, function (data) {
                    // if (!data) return;
                    for (var i = 0; i < data.data.length; i++) {
                        self.resultList.push(data.data[i].images)
                    }
                    console.log(JSON.stringify(data))
                }).fail(function () {
                    alert("error");
                });
            }
        }
    }
});


