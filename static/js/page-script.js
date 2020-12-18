$(window).load(function () {
    var $body = $('body');
    var loader = $('.loader');
    var stopLoader = function () {
        loader.css({'display': 'none'})
    };
    var showLoader = function () {
        loader.removeAttr('style');
    };
    setTimeout(function () {
        stopLoader();
    }, 1000);

    /*INPUT - запрет ввода букв*/
    function proverka(input) {
        input.value = input.value.replace(/[^\d,]/g, '');
    };
    /*INPUT - запрет ввода букв*/
    $('.sidebarTrigger').on('click', function (e) {
        e.preventDefault();
    });

    var arrows = $('.portfolio-slider-arrow');
    var portfolioElement = $('[data-portfolio-id]');
    portfolioElement.on('click', function () {
        var num = $(this).data('portfolio-id');
        slide(num);
    });

    var glob_num = 0;

    arrows.on('click', function (e) {
        slide(glob_num, $(this).data('action'))
    });

    function slide(num, action) {
        num = parseInt(num);
        if (action) {
            if (action == 'next') {
                num++;
            } else {
                num--;
            }
        }

        var max = portfolioElement.length + 1;
        if (num == 0) {
            num = max - 1;
        } else if (num == max) {
            num = 1;
        }
        glob_num = num;
        $('.portfolio-slider-content .portfolio-slide').removeClass('active');
        $('.portfolio-slider-content .portfolio-slide[data-id="' + num + '"]').addClass('active');
    }

    $('input[name="phone"]').mask('+7(999) 999-9999');


    //range slide
    var selectsWithRanges = $('.with-range');
    var createRange = function (range, rangeSlide, minVal, maxVal) {
        var min = $(range).find('input[name="price[min]"]');
        var max = $(range).find('input[name="price[max]"]');
        var minText = $(range).find('.min-value');
        var maxText = $(range).find('.max-value');
        noUiSlider.create(rangeSlide, {
            range: {
                'min': minVal,
                'max': maxVal
            },
            step: 100,
            start: [minVal, maxVal],
            // Display colored bars between handles
            connect: true,
            // Put '0' at the bottom of the slider
            direction: 'ltr',
        });

        rangeSlide.noUiSlider.on('update', function (values, handle) {
            var val = parseInt(values[handle]);

            if (handle) {
                max[0].value = val;
                maxText.text(val);
            } else {
                min[0].value = val;
                minText.text(val);
            }
        });
    };
    var initRange = function (select, range) {
        $(range).removeClass('hidden');

        var option = select.children("option:selected");
        var minVal = $(option).data('min') || 0;
        var maxVal = $(option).data('max') || 0;

        $(range).find('.range-slide').remove();
        var container = document.createElement('div');
        container.classList.add('range-slide');
        var rangeSlide = document.createElement('div');
        container.append(rangeSlide);
        $(range).append(container);

        createRange(range[0], rangeSlide, minVal, maxVal);
    };

    selectsWithRanges.on('change', function () {
        var _self = $(this);
        var option = _self.children("option:selected");
        var range = $('#' + _self.data('range-id'));

        if ($(option).data('max') && range.length > 0) {
            initRange(_self, range);
        } else {
            !range.length || range.addClass('hidden');
            $(range).find('.min-value').val(0);
            $(range).find('.max-value').val(0);
        }
    });

    var ranges = $('.form-range');
    $.each(ranges, function (i, e) {
        var container = document.createElement('div');
        container.classList.add('range-slide');
        var range = document.createElement('div');
        container.append(range);
        e.append(container);

        createRange(e, container, $(e).data('min'), $(e).data('max'));
    });

    function getFormRules(e) {
        var i = 0;
        var rules = {};
        while((el = e[i])) {
            rules[el.name] = {};
            rules[el.name].required = !!el.required ;
            rules[el.name].minLength = el.minlength == -1? false : el.minlength;
            i++;
        }
        return rules;
    }
    $.each($('form'), function(i,e) {
        var rules = getFormRules(e);
        $(this).validate({rules:rules});
    });
    $('form').on('submit', function (e) {
        e.preventDefault();
        if($(this).find('.error').length > 0) return;
        showLoader();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize()
        }).done(function () {
            stopLoader();
            showPopup('message');
        }).fail(function () {
            stopLoader();
        });

        $(this).trigger('reset');

        $(this).closest('.sidebar').find('.close').trigger('click')
    });

    function showPopup (id) {
            var element = $('.popup[data-popup-id="' + id + '"]');

        if (element.length > 0) {
            $(element).addClass("visible");
            $body.toggleClass("popupShown");
            $(element).scrollTop(0);
            window.allowSlide = 0;
            window.popupShown = 1;
        }
    }


    function hidePopup() {
        $body.removeClass("popupShown");
        $(".popup.visible").removeClass("visible");
        window.allowSlide = 0;
        window.popupShown = 0;
    }



    $('.message button').on('click', function () {
        hidePopup()
    });

});