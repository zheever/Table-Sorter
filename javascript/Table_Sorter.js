
(function () {

    var ascend = true;
   $(document).ready(function () {
       addTdClickListener();
   }) ;

       function addTdClickListener() {
           $("th").each(function () {
                    $(this).click(Sort_fun.bind(null, $(this)));
               }
           )
       }

       function Sort_fun(Sort_Td) {
           var col = get_col(Sort_Td);
           var items = Sort_Td.parent().siblings();
           Sorting(items, col);
           ascend = !ascend;
           css_change(Sort_Td);
           tr_change_sequence(Sort_Td, items);
       }
       
       function css_change(Sort_Td) {
           $(".th_click").removeClass("th_click");
           $('.ascend_or_descend_sign').remove();
           Sort_Td.addClass("th_click");
           if (ascend) Sort_Td.append("<span class='ascend_or_descend_sign'>▲</span>");
           else Sort_Td.append("<span class='ascend_or_descend_sign'>▼</span>");
       }

       function Sorting(items, col) {
           if (ascend)
               items.sort(Sorter.bind(null, col, function (a, b) {
                   return a > b? 1: -1;
               }));
           else
               items.sort(Sorter.bind(null, col, function (a, b) {
                   return a < b? 1: -1;
               }));
       }


       function tr_change_sequence(Sort_Td, items) {
           var i = 0;
           var html_Array = get_items_html(items);
           Sort_Td.parent().siblings().each(function () {
               $(this).html(html_Array[i]);
               i++;
           });
       }

       function get_items_html(items) {
           var i = 0;
           var html_Array = [];
           $.each(items, function () {
               html_Array[i] = $(items[i]).html();
               i++;
           });
           return html_Array;
       }

       function Sorter(col, cmp, a, b) {
            var x = $(a).children().eq(col).html(), y = $(b).children().eq(col).html();
            return cmp(x, y);
       }

        function get_col(Sort_Td) {
            var count = 0, position = 0;
            var all_td_in_a_table = Sort_Td.parent().children();
            all_td_in_a_table.each(function () {
                count ++;
                if ($(this).html() == Sort_Td.html()) position = count - 1;
            });
            return position;
        }

})();