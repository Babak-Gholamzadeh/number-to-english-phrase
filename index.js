const num2words = num =>
    num ? (() => {
        const units = [
            ['', 'ten ', '', ''],
            ['one ', 'eleven ', '', 'thousand '],
            ['two ', 'twelve ', 'twenty ', 'million '],
            ['three ', 'thirteen ', 'thirty ', 'billion '],
            ['four ', 'fourteen ', 'forty ', 'trillion '],
            ['five ', 'fifteen ', 'fifty ', 'quadrillion '],
            ['six ', 'sixteen ', 'sixty ', 'quintillion '],
            ['seven ', 'seventeen ', 'seventy ', 'sextillion '],
            ['eight ', 'eighteen ', 'eighty ', 'septillion '],
            ['nine ', 'nineteen' , 'ninety ', 'octillion ']
        ];
        const getD1 = (index, i) => units[index][i];
        const getD2 = index => units[index][2];
        const getD3 = index => getD1(index, 0) !== '' ? getD1(index, 0) + 'hundred ' : '';
        let strNumber = num.toString() || '0';
        strNumber = strNumber.padStart(Math.ceil(strNumber.length / 3) * 3, '0');
        strNumber = [...strNumber].reverse().join('').match(/.{1,3}/g);
        return strNumber.reduce((result, value, i) => {
            const tempResult = ((d1, d2, d3) => {
                const d3Result = +d3 ? getD3(d3) : '';
                const d2Result = +d2 ? getD2(d2) : '';
                const d1Result = getD1(d1, +!Boolean(d2Result || (+d2 - 1)));
                return d3Result + d2Result + d1Result;
            })(...value);
            return tempResult + (tempResult ? units[i][3] : '') + result;
        }, '');
    })() : 'zero';
console.log(num2words(process.argv[2]));

