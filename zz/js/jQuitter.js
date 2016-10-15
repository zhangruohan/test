/**
 *  The document.getElement... is so boring and I am too lazy to require jQuery
 *  you can use zz('#id') to choose the dom by id
 *  ...zz('.class')...class
 *  ...zz('*name')...name
 *  ...zz('tag.class')...class whose tag name is tag
 *  ...zz('tag.name')...name whose tag name is tag
 *  and the question is coming if I can use it like zz('#id','.class'...)
 *  yes, you can! all the things that you need to know is which is a dom or a array of dom
 *  you also can change the zz of the function name into whatever you like but you'd better insure that the new name wouldn't conflict with the existing things in your program
 *  welcome to point out mistakes
 * Created by mike on 2016/7/4
 */
function zz()
{
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++)
    {
        var element = arguments[i];
        if (typeof element == 'string'){
            switch(element.substr(0,1))
            {
                case '#':
                    element = document.getElementById(element.substr(1));   // #id
                    break;
                case '.':
                    element = document.getElementsByClassName(element.substr(1));  // .class
                    break;
                case '*':
                    element = document.getElementsByName(element.substr(1));  // *name
                    break;
                default:
                    var num = element.search(/\.|\*/);           // reg
                    if(num != -1){                                // mix
                        var arr = new Array();
                        var tag = element.substr(0,num);         // tag
                        if(element.indexOf('.') != -1){
                            element = document.getElementsByClassName(element.substr(num+1));  // tag.class
                        }else{
                            element = document.getElementsByName(element.substr(num+1));     // tag.name
                        }
                        for(var j=0;j<element.length;j++){    // filter
                            if(element[j].tagName.toLowerCase() == tag){    // lower case
                                arr.push(element[j]);
                            }
                        }
                        element = arr;
                    }else{
                        element = document.getElementsByTagName(element);
                    }
            }
            if (arguments.length == 1)
                return element;
            elements.push(element);
        }
    }
    return elements;
}

