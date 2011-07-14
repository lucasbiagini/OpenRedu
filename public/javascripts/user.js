(function($){
    $.fn.refreshMobileMask = function(){
      return this.each(function(){
          var $this = $(this);
          $this.mask("+99 (99) 9999-9999", { placeholder:" " });
      });
    };

    $.fn.refreshEndDateVisibility = function(){
      return this.each(function(){
          $(this).parent().siblings(".end-date").hide();
      });
    };

    $.fn.refreshSocialNetwork = function(){
      return this.each(function (){
        $("#new-social-network").hide();
        $('#select-networks .select-network').live("change", function() {
          var $this = $(this);
          if ($this.val() != '') {
            if ($this.parent().nextAll("li").length == 0) {
              $this.next().show();
              var new_id = new Date().getTime();
              var regexp = new RegExp("new_social_networks", "g");
              var new_social_network = $('#new-social-network').html();
              new_social_network = new_social_network.replace(regexp, new_id);
              $("#select-networks > ul").append(new_social_network);
            }
          }
        });
      });
    };

    jQuery(function(){
        $("#biography .mobile").refreshMobileMask();
        $(".current-experience #experience_current:checked").refreshEndDateVisibility();
        $("#biography").refreshSocialNetwork();

        $("#curriculum .educations form").hide();

        if ($("#curriculum .educations > li").length > 0) {
          $("#new_education").hide();
          $("#curriculum .new-education-button").show();
        } else {
          $("#new_education").show();
          $("#curriculum .new-education-button").hide();
        }

        $("#experience_current").live("change", function(){
            $("#curriculum .end-date").slideToggle();
        });

        $("#curriculum .new-experience-button").live("click", function(){
            $(this).hide();
            $("#new_experience").slideToggle();
            return false;
        });

        $("#curriculum .new-education-button").live("click", function(){
            $(this).hide();
            $("#new_education").slideToggle();
            return false;
        });

        $("#curriculum .edit-experience").live("click", function(){
            $experiences = $("#curriculum .experiences > li");
            $experiences.find(".infos").show();
            $experiences.find("form").fadeOut();
            $("#new_experience").hide();
            $("#curriculum .new-experience-button").hide();

            var $infos = $(this).parent();
            $infos.fadeOut();
            $infos.siblings("form").fadeIn();
            return false;
        });

        $("#curriculum .edit-education").live("click", function(){
            $educations = $("#curriculum .educations > li");
            $educations.find(".infos").show();
            $educations.find("form").slideUp();
            $("#new_education").hide();
            $("#curriculum .new-education-button").hide();

            var $infos = $(this).parent();
            $infos.slideUp();
            $infos.siblings("form").slideDown();
            return false;
        });

        $(document).ajaxComplete(function(){
            $("#biography .mobile").refreshMobileMask();
            $(".current-experience #experience_current:checked").refreshEndDateVisibility();
            $("#biography").refreshSocialNetwork();

            $("#curriculum .educations form").hide();
            $("#curriculum .educations .infos").show();
            if ($("#curriculum .educations > li").length > 0) {
              $("#new_education").hide();
              $("#curriculum .new-education-button").show();
            } else {
              $("#new_education").show();
              $("#curriculum .new-education-button").hide();
            }
        });
    });
})($);
