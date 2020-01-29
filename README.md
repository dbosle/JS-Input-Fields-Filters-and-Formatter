# JS-Input-Fields-Filters-and-Formatter
JS HTML Form Input Elements Filters and Formater

## Usage
* Import JS file to your page
```
<script src="inputFormatter.js"></script>
```

* For example you have these input fields:
```
<input type="text" id="numberInput" />
<input type="text" id="priceInput" />
```

* Now we can set this html element to accept only the number:
```
<script>
   setOnlyNumberInput("numberInput"); // => Sets input field only for number
   setOnlyPriceInput("priceInput"); // => Sets input field only for price
</script>
```

Now our html input fields only accepts numbers and prices.
