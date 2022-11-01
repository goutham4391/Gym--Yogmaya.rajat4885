// Xplor connect
// 2022-07-14 EC
// 2022-07-15 EC#2

//
(function ($) {
    function getParams(a) {
        const b = document.getElementsByTagName("script");
        for (let i = 0; i < b.length; i++) {
            if (b[i].src.indexOf("/" + a) > -1) {
                const c = b[i].src.split("?").pop().split("&");
                const p = {};
                p.ENV = b[i].src.indexOf("/forms-staging/") > -1 ? "staging" : "prod";
                for (let j = 0; j < c.length; j++) {
                    const d = c[j].split("=");
                    p[d[0]] = d[1]
                }
                return p
            }
        }
        return {}
    };

    async function fetchTOSLinks(accountID) {
        let apiUrl = 'api';
        if (params.ENV === "staging") {
            apiUrl = 'staging-api';
        }
      try {
        const response = await fetch(`https://${apiUrl}.brandbot.cloud/vendor/marianatek/accounts/${accountID}/terms_and_service`);
        const linkData = await response.json()
        $("#terms-link").attr("href", `${linkData.terms_of_service_url}`)
        $("#privacy-link").attr("href", `${linkData.privacy_policy_url}`)
        $("#bb_mt_terms_and_service_container").css( "display", "block" );
        $("#bb_mt_terms_and_service").attr("required", "required")
        return;
      } catch (err) {
        console.log('err', err);
        return;
      }
    };


    const params = getParams('embed.js');
    const formId = params.id;
    let accountId;
    let mtSync = false;
    let redirectUrl = null;

    const $form = $("form[name=" + formId + "]");
    const $alert = $("#alert", $form);
    const $bb_uuid = $("#bb_uuid", $form);
    const $bb_email = $("#bb_email", $form);
    const $bb_submit = $("#bb_submit", $form);

    let url = 'https://microservices.brndbot.net/forms/parameters';
    if (params.ENV === "staging") {
        url = url.replace('/forms/', '/forms-staging/');
    }

    let recaptcha_key;

    $.get(url + '?uuid=' + $bb_uuid.val(), function (response) {
        accountId = response.parameters.account.account_id;
        redirectUrl = response.parameters.redirect && response.parameters.redirect.active ? response.parameters.redirect.url : null;
        // YO - Normally this would NOT be enough to tell you if
        // a form was a waiver or form BUT since it's embded form (theres no embed waiver)
        // we should be ok.
        if (response.parameters.sync.active && response.parameters.sync.vendor === 'marianatek') {
            fetchTOSLinks(accountId);
            mtSync = true;
        }
        try {
            recaptcha_key = response.parameters.template.use_recaptcha ? response.parameters.template.recaptcha_key : null;
            if (recaptcha_key) {
                $.getScript("https://www.google.com/recaptcha/api.js?render=" + recaptcha_key);
            }
        } catch (e) {
        }
    });

    $form.on("submit", function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (!recaptcha_key) {
            submitPayload();
            return false;
        }
        grecaptcha.ready(function () {
            grecaptcha.execute(recaptcha_key, {action: 'submit'}).then(function (token) {
                submitPayload(token);
            });
        });
        return false;
    });

    function submitPayload(g_recaptcha_response) {

        $alert.hide().html("").removeClass("success").removeClass("error");
        $("#invalid-feedback", $form).remove();
        $bb_submit.attr("disabled", true);
        if (!$bb_uuid || $bb_uuid.val().length !== 36 || !$bb_email || !$bb_email.val()) {
            return;
        }
        const payload = {
            uuid: $bb_uuid.val(),
            response: {
                first_name: $("#bb_first_name", $form).val(),
                last_name: $("#bb_last_name", $form).val(),
                email: $bb_email.val(),
                password: $("#bb_password", $form).val(),
                phone: $("#bb_phone", $form).val(),
                address_1: $('#bb_address_1', $form).val(),
                address_2: $('#bb_address_2', $form).val(),
                city: $('#bb_city', $form).val(),
                state: $('#bb_state', $form).val(),
                zipcode: $('#bb_zipcode', $form).val(),
                country: $('#bb_country', $form).val(),
                emg_email: $('#bb_emg_email', $form).val(),
                emg_phone: $('#bb_emg_phone', $form).val(),
                emg_name: $('#bb_emg_name', $form).val(),
                emg_relationship: $('#bb_emg_relationship', $form).val(),
                referral_source: $('#bb_referral_source', $form).val(),
            }
        };

        if (mtSync) {
            payload.response.home_location = $('#bb_home_location', $form).val(),
                payload.response.mt_opt_in_sms = $('#bb_mt_opt_in_sms', $form).prop('checked'),
                payload.response.mt_opt_in_email = $('#bb_mt_opt_in_email', $form).prop('checked'),
                payload.response.mt_terms_and_service = $('#bb_mt_terms_and_service', $form).val(),
                payload.response.birthday_day = $('#bb_bday_day', $form).val();
            payload.response.birthday_month = $('#bb_bday_month', $form).val();
            payload.response.birthday_year = $('#bb_bday_year', $form).val();
        }

        payload.response.g_recaptcha_response = g_recaptcha_response;

        const inputs = $(":input", $form);
        for (let i in inputs) {
            if (inputs[i].id && inputs[i].id.indexOf("custom") > -1) {
                if ($(inputs[i]).is(":checkbox")) {
                    if ($(inputs[i]).is(":checked")) {
                        payload.response[inputs[i].id.replace('bb_', '')] = $(inputs[i]).val();
                    }
                } else {
                    payload.response[inputs[i].id.replace('bb_', '')] = $(inputs[i]).val();
                }
            }
        }

        //
        let postURL = $form.attr("action");
        if (params.ENV === "staging") {
            postURL = postURL.replace('/forms/', '/forms-staging/');
        }

        $.ajax({
            type: "POST",
            url: postURL,
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function (data) {
                $bb_submit.attr("disabled", false);
                $alert.addClass("success");
                $alert.html('Your submission was successful!');
                $alert.show();
                $form.get(0).reset();
                const ephemeralToken = data.ephemeralToken;
                if (mtSync && redirectUrl && ephemeralToken) {
                    let baseUrl = 'api';
                    if (params.ENV === 'staging') {
                        baseUrl = 'staging-api';
                    }
                    const finalDestinationUrl = encodeURIComponent(redirectUrl);
                    redirectUrl = `http://${baseUrl}.brandbot.cloud/forms-login/marianatek/oauth/redirect?token=${ephemeralToken}&destinationUrl=${finalDestinationUrl}&accountId=${accountId}`;
                    window.location.href = redirectUrl;
                } else if (redirectUrl) {
                    window.location.href = redirectUrl;
                }

            },
            error: function (err) {
                $bb_submit.attr("disabled", false);
                if (!err.responseJSON) {
                    return;
                }
                const response = err.responseJSON;
                if (response.hasOwnProperty("message") && response.hasOwnProperty("field")) {
                    $('<div id="invalid-feedback" class="invalid-feedback">' + response.message + "</div>")
                        .insertAfter("input#bb_" + response.field, $form);
                }
                if (response.hasOwnProperty("message")) {
                    $alert.addClass("error");
                    $alert.html(response.message);
                    $alert.show();
                }
            }
        });
        return false;
    }
})(jQuery);
