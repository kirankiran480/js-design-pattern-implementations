function (){

 var pubSub = function () {
    //common cache object
    var cache = {};

    return {
        //publisher function to publish an event with id along with new objects 
        pub: function (id) {
            // convert arguments array like object to array for push and pop operations

            var args = [].slice.call(arguments, 1);
         
         // if id is not present , create a property in cache with id key and value as object of callbacks and arguments 
            if (!cache[id]) {
                cache[id] = {
                    callbacks: [],
                    args: [args]
                };
            } else {
                //if id is present , push arguments 
                cache[id].args.push(args);
            }

         // iterate and call each of callbacks in callbacks list with arguments provided
            for (var i = 0, il = cache[id].callbacks.length; i < il; i++) {
                cache[id].callbacks[i].apply(null, args);
            }
        },

        // subscriber function to subscribe to a particular event with an id and a callback function to be executed whenever changes are published 
        sub: function (id, fn) {
            if (!cache[id]) {
                cache[id] = {
                    callbacks: [fn],
                    args: []
                };
            } else {
                // if id is present push the fn to the list of callbacks to be executed whenever publish event is called
                cache[id].callbacks.push(fn);
 
               //loop over the arguments in cache and apply each of the arguments to the function  
                for (var i = 0, il = cache[id].args.length; i < il; i++) {
                    fn.apply(null, cache[id].args[i]);
                }
            }
        },

        // unsubscribe function to unsubscript to a particular event 
        unsub: function (id, fn) {
            var index;
            if (!cache[id]) {
                return;
            }

            if (!fn) {
                cache[id] = {
                    callbacks: [],
                    args: []
                };
            } else {
                index = cache[id].callbacks.indexOf(fn);
                if (index > -1) {
                    cache[id].callbacks = cache[id].callbacks.slice(0, index).concat(cache[id].callbacks.slice(index + 1));
                }
            }
        }
    };
}

return pubSub;
}();
