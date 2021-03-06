/**
 * Created by David on 4/1/2017.
 */
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            {text: 'Learn JavaScript'},
            {text: 'Learn Vue'},
            {text: 'Build something awesome'}
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }

});

Vue.component('cake-item', {
    // The cake-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called cake.
    props: ['cake'],
    template: '<li>{{ cake.text }}</li>'
});


var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {text: 'Vegetables'},
            {text: 'Cheese'},
            {text: 'Whatever else humans are supposed to eat'}
        ]
    }
});