import { Injectable } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Injectable()
export class UtilsService {

    constructor() { }

    comboBoxControls = {
        compareSelect ( o1, o2 ) {

            if ( o1 && o2 ) {
                return o1.id === o2.id;
            }
        }
    };

    string = {
        highlight: function( content: string, word: string, position: number = 1 ) {
            if ( !word ) { return content; }
            let pos = 1;
            return content.replace(new RegExp(word, 'gi'), match => {
                if ( pos === position ) {
                    pos++;
                    return '<span class="highlightText">' + match + '</span>';
                } else {
                    pos++;
                    return match;
                }
            });
        },
        highlightWordFound: function( content: string, word: string, position: number = 1 ) {
            if ( !word ) { return false; }
            return content.match(new RegExp(word, 'gi')).length >= position;
        }
    };

    logs = {

        biggerThan24Hours: function ( start_date: any, end_date: any ) {
            console.log(differenceInDays( end_date, start_date ));
            return differenceInDays( end_date, start_date ) > 0;
        },
        getMinDate: function ( date: any ) {
            if ( date ) {
                return new Date( date.setDate(date.getDate() - 1 ) );
            }
        },
        getMaxDate: function( date: any ) {
            if ( date ) {
                return new Date( date.setDate(date.getDate() + 1 ) );
            }
        }
    };

    array = {
        /**
        *  Checks if an object exists in an array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} value
        *  @return {bool}
        */

        itemExists: function (array, key, value) {

            if (array.constructor === Array && key.constructor === String) {

                let f, F;
                let iterationValue;
                const newValue = value.constructor === String ? value.toUpperCase() : value;

                for (f = 0, F = array.length; f < F; f++) {

                    iterationValue = array[f][key].constructor === String ? array[f][key].toUpperCase() : array[f][key];

                    if (iterationValue === newValue) {

                        return true;
                    }
                }
            }

            return false;
        },

        /**
        *  Gets an object from an array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} value
        *  @return {object}
        */
        selectItem: function (array, key, value) {

            if (array.constructor === Array && key.constructor === String) {

                let f, F;
                let iterationValue;
                const newValue = value.constructor === String ? value.toUpperCase() : value;

                for (f = 0, F = array.length; f < F; f++) {

                    iterationValue = array[f][key].constructor === String ? array[f][key].toUpperCase() : array[f][key];

                    if (iterationValue === newValue) {

                        return array[f];
                    }
                }
            }

            return false;
        },

        /**
        *  Gets one or more objects from an array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} value
        *  @return {array} arrayToSend
        */
        selectItems: function (array, key, value) {

            if (array.constructor === Array && key.constructor === String) {

                let f, F;
                let iterationValue;
                const newValue = value.constructor === String ? value.toUpperCase() : value;
                const arrayToSend = [];

                for (f = 0, F = array.length; f < F; f++) {

                    iterationValue = array[f][key].constructor === String ? array[f][key].toUpperCase() : array[f][key];

                    if (iterationValue === newValue) {

                        arrayToSend.push(array[f]);
                    }
                }

                return arrayToSend;
            }

            return false;
        },

        /**
        *  Gets an object from a recursive array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} recursive
        *  @param {string} key
        *  @param {string} value
        *  @return {object} item
        */
        selectItemRecursive: function (array, recursive, key, value) {

            let item;

            if (array.constructor === Array && key.constructor === String && recursive.constructor === String) {

                let f, F;

                for (f = 0, F = array.length; f < F; f++) {

                    if (array[f] && array[f][key] === value) {

                        item = array[f];
                        break;
                    } else {

                        item = this.selectItemRecursive(array[f][recursive], recursive, key, value);

                        if (item) {

                            break;
                        }
                    }
                }
            }

            return item;
        },

        /**
        *  Updates an item from an array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} value
        *  @param {string} newItem
        */
        updateItem: function (array, key, value, newItem) {

            if (array.constructor === Array && key.constructor === String) {

                let f, F;

                for (f = 0, F = array.length; f < F; f++) {

                    if (array[f] && array[f][key] === value) {

                        Object.assign(array[f], newItem);
                        break;
                    }
                }
            }
        },

        /**
        *  Updates an item from an array recursively, based on a given property.
        *
        *  @param {array} array
        *  @param {string} recursive
        *  @param {string} key
        *  @param {string} value
        *  @param {string} newItem
        *  @return {bool}
        */
        updateItemRecursive: function (array, recursive, key, value, newItem) {

            let updated = false;

            if (array.constructor === Array && key.constructor === String && recursive.constructor === String) {

                let f, F;

                for (f = 0, F = array.length; f < F; f++) {

                    if (array[f] && array[f][key] === value) {

                        Object.assign(array[f], newItem);
                        updated = true;
                        break;
                    } else {

                        updated = this.updateItemRecursive(array[f][recursive], recursive, key, value, newItem);

                        if (updated) {

                            break;
                        }
                    }
                }
            }

            return updated;
        },

        /**
        *  Removes an item from an array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} value
        */
        removeItem: function (array, key, value) {

            if (array.constructor === Array && key.constructor === String) {

                let f, F;

                for (f = 0, F = array.length; f < F; f++) {

                    if (array[f] && array[f][key] === value) {

                        array.splice(f, 1);
                        break;
                    }
                }
            }
        },

        /**
        *  Removes an item from a recursive array, based on a given property.
        *
        *  @param {array} array
        *  @param {string} recursive
        *  @param {string} key
        *  @param {string} value
        *  @return {bool}
        */
        removeItemRecursive: function (array, recursive, key, value) {

            let deleted = false;

            if (array.constructor === Array && key.constructor === String && recursive.constructor === String) {

                let f, F;

                for (f = 0, F = array.length; f < F; f++) {

                    if (array[f] && array[f][key] === value) {

                        array.splice(f, 1);
                        deleted = true;
                        break;
                    } else {

                        deleted = this.removeItemRecursive(array[f][recursive], recursive, key, value);

                        if (deleted) {

                            break;
                        }
                    }
                }
            }

            return deleted;
        },

        /**
        *  Order array by field
        *
        *  @param {array} array
        *  @param {string} key
        *  @param {string} type
        */
        orderByField: function (array, key, type) {

            array.sort(function (a, b) {

                if (type === 'DESC') {

                    return a[key] < b[key];
                } else {

                    return a[key] > b[key];
                }
            });
        },
        diff: function (a, b) {

            const onlyInA = a.filter(function (current) {
                return b.filter(function (current_b) {
                    return current_b.id === current.id;
                }).length === 0;
            });

            const onlyInB = b.filter(function (current) {
                return a.filter(function (current_a) {
                    return current_a.id === current.id;
                }).length === 0;
            });

            return onlyInA.concat(onlyInB);
        }
    };
}
