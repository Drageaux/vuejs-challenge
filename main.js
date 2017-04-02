/**
 * Created by David on 4/2/2017.
 */
$("form button").click(function (e) {
    e.preventDefault();
});

var giphyUrl = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=pg&limit=100&q=';

new Vue({
    el: '#app',
    data: {
        message: 'Hallo Werld!',
        input: '',
        resultList: [],
        savedList: [],
        loading: false
    },
    methods: {
        searchGiphy: function (keyword) {
            // example API call: http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
            var self = this;
            // do ajax
            if (keyword) {
                self.loading = true;
                self.resultList = [];
                $.get(giphyUrl + keyword, function (data) {
                    if (!data) {
                        $.notify('Error searching for images', {className: 'error', position: 'bottom right'});
                        return;
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        self.resultList.push(data.data[i].images)
                    }
                    self.loading = false;
                }).fail(function () {
                    $.notify('Error searching for images', {className: 'error', position: 'bottom right'});
                });
            }
        },
        save: function (index) {
            var self = this;
            for (var i = 0; i < self.savedList.length; i++) {
                if (self.resultList[index].original.url == self.savedList[i].original.url) {
                    $.notify('Image already saved', {className: 'error', position: 'bottom right'});
                    return
                }
            }
            self.savedList.push(self.resultList[index]);
            $.notify('Saved', {className: 'success', position: 'bottom right'})
        },
        remove: function (index) {
            var self = this;
            self.savedList.splice(index, 1);
            $.notify('Removed', {className: 'success', position: 'bottom right'})
        }
    }
});


