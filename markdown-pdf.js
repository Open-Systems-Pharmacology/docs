var fs = require('fs'),
  path = require('path'),
  markdownpdf = require('markdown-pdf'),
  through = require('through2'),
  cheerio = require('cheerio'),
  filePath = path.join(__dirname, 'SUMMARY.md'),
  basePath = path.resolve(__dirname, 'SUMMARY.md');

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
  if (!err) {
    parsingMD(data);
  } else {
    console.log(err);
  }
});

function parsingMD(data) {
  var look = data.split(/\n/),
    re = /\(([^)]+)\)/,
    reBrackets = /\[([^)]+)\]/,
    mdDocs = new Array(),
    bookPath = 'open-systems-pharmacology.pdf';

  mdDocs.push(basePath);
  mdDocs.push('core-separator.md');

  for (var i = 0; i < look.length; i++) {
    var replacement = re.exec(look[i]);

    if (replacement) {
      look[i] = look[i].replace(re, '#include "' + replacement[1] + '"');
      look[i] = look[i].replace(reBrackets, '');
      look[i] = look[i].replace('*', '');
      look[i] = look[i].trim();

      mdDocs.push(replacement[1]);
    }
  }

  markdownpdf({
    preProcessHtml: preProcessHtml(basePath),
    paperFormat: 'Letter',
    paperBorder: '0.55in',
    runningsPath: path.resolve(__dirname, 'running-t.js')
  })
    .concat.from(mdDocs)
    .to(bookPath, function() {
      console.log('PDF file created: ', bookPath);
    });
}

function stylingElements($) {
  $("*:contains('![')").each(function() {
    $(this).html(
      $(this)
        .html()
        .replace(/(?:!\[(.*?)\]\((.*?)\))/g, function(a, b, c) {
          var replacement = "<img src='" + c + "' />";
          return replacement;
        })
    );
  });

  $("*:contains('# ')").each(function() {
    var h1Element = $(this),
      imgElement,
      h1String;

    if (h1Element.text().indexOf('#') == 0) {
      h1String = h1Element.text();
      imgElement = h1Element.find('img');
      h1Element.html(imgElement);
      h1String = h1String.replace('# ', '');
      h1Element.after('<div style="page-break-after: always;"></div><h1>' + h1String + '</h1>');

      if (h1Element.parent('tr') || h1Element.parent('tr').parent('table')) {
        $('table tr h1')
          .parent()
          .parent()
          .parent()
          .after('<br/><h1>' + h1String + '</h1>');
        $('tr h1').remove();
      }
    }
  });

  $('img[src]').each(function() {
    var imagePath = $(this).attr('src');
    (imagePath = path.resolve(basePath, imagePath)), (altImage = $(this).attr('alt'));

    $(this).attr(
      'src',
      'file://' + (process.platform === 'win32' ? '/' : '') + imagePath.replace('../assets/icons', 'assets/icons')
    );
    $(this).css('max-width', '100%');

    if (altImage !== undefined && altImage !== 'Image') {
      $(this).wrap("<div style='text-align: center;'></div>");
      $(this)
        .parent()
        .after(
          "<div style='text-align: center; color: #808080; font-style: italic; margin-bottom: 40px; margin-top: 20px;'>" +
            $(this).attr('alt') +
            '</div>'
        );
    }
  });

  $('body').css('margin', '5px 20px 5px 20px');

  $('pre').remove();

  $('p:contains(\'{% hint style="tip" %}\')').each(function() {
    var content = $(this);

    content.html(
      content
        .html()
        .replace(
          '{% hint style=&quot;tip&quot; %}',
          '<quote style="background-color: #f3f3f3; display: block; padding: 10px 20px 20px 20px; margin: 20px 0 20px 0; border-left: 3px solid blue;">'
        )
    );
    content.html(content.html().replace('{% endhint %}', '</quote>'));
  });

  $('p:contains(\'{% hint style="note" %}\')').each(function() {
    var content = $(this);

    content.html(
      content
        .html()
        .replace(
          '{% hint style=&quot;note&quot; %}',
          '<quote style="background-color: #f3f3f3; display: block; padding: 10px 20px 20px 20px; margin: 20px 0 20px 0; border-left: 3px solid red;">'
        )
    );
    content.html(content.html().replace('{% endhint %}', '</quote>'));
  });

  $('p:contains(\'{% hint style="warning" %}\')').each(function() {
    var content = $(this);

    content.html(
      content
        .html()
        .replace(
          '{% hint style=&quot;warning&quot; %}',
          '<quote style="background-color: #f3f3f3; display: block; padding: 10px 20px 20px 20px; margin: 20px 0 20px 0; border-left: 3px solid yellow;">'
        )
    );
    content.html(content.html().replace('{% endhint %}', '</quote>'));
  });

  $('p:contains(\'{% hint style="info" %}\')').each(function() {
    var content = $(this);

    content.html(
      content
        .html()
        .replace(
          '{% hint style=&quot;info&quot; %}',
          '<quote style="background-color: #f3f3f3; display: block; padding: 10px 20px 20px 20px; margin: 20px 0 20px 0; border-left: 3px solid green;">'
        )
    );
    content.html(content.html().replace('{% endhint %}', '</quote>'));
  });

  $('table').each(function() {
    $(this).css('border-collapse', 'collapse');
    $(this)
      .find('tr')
      .css('border', '1px solid black');
    $(this)
      .find('td')
      .css({ border: '1px solid black', padding: '10px' });
    $(this)
      .find('th')
      .css({ border: '1px solid black', padding: '10px' });
  });

  // Transform the .md paths to id/h1 elements in the link tag
  $('a').each(function() {
    var originalTag = $(this),
      textTag = originalTag.text();

    originalTag.after('<strong>' + textTag + '</strong>');
    originalTag.remove();
  });

  $("*:contains('<br')").each(function() {
    var content = $(this);
    content.html(content.html().replace(/&lt;br&gt;/g, '<br/>'));
  });

  console.log('*** Styles applied ***');

  return $;
}

function preProcessHtml(basePath) {
  return function() {
    return through(function(chunk, encoding, callback) {
      var $ = cheerio.load(chunk);

      $ = stylingElements($);

      // Enable this to debug in html document and inspect with the browser
      //   fs.writeFile(path.resolve(__dirname, 'debugger.html'), $.html(), function(err) {
      //     if (err) console.log(err);
      //     console.log('*** debugger.html written ***');
      //   });

      this.push($.html());

      console.log('Html file processed.');

      callback();
    });
  };
}
