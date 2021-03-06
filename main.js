/**
 * Created by David on 4/2/2017.
 */
$("form button").click(function (e) {
    e.preventDefault();
});

var giphyUrl = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=pg&limit=100&q=';

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
                        data.data[i].images.loaded = false;
                        self.resultList.push(data.data[i].images)
                    }
                    self.loading = false;
                }).fail(function () {
                    $.notify('Error searching for images', {className: 'error', position: 'bottom right'});
                });
            }
        },
        onImgLoad: function (index) {
            this.resultList[index].loaded = true;
        },
        onMouseOver: function (index, listName, event) {
            if (event) {
                var self = this;
                if (listName == "result") {
                    event.target.src = get(self.resultList[index], ["fixed_height", "url"])
                } else if (listName == "saved") {
                    event.target.src = get(self.savedList[index], ["fixed_height", "url"])
                }
            }
        },
        onMouseLeave: function (index, listName, event) {
            if (event) {
                var self = this;
                if (listName == "result") {
                    event.target.src = get(self.resultList[index], ["fixed_height_still", "url"])
                } else if (listName == "saved") {
                    event.target.src = get(self.savedList[index], ["fixed_height_still", "url"])
                }
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


function get(obj, listOfKeys) {
    if (obj == null) {
        return null
    }
    var value = obj;
    for (var i = 0; i < listOfKeys.length; i++) {
        if (value[listOfKeys[i]]) {
            value = value[listOfKeys[i]]
        } else {
            return null
        }
    }
    return value;
}

