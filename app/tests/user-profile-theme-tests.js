/* user-profile-theme-tests.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the Grow user profile theme.
 */
/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('User Profile Theme', function() {

        // [jasmine-jquery] User Profile Theme is available in the <head> through its Liferay themeId
        it('is present on page', function() {
            expect($('head')).toContainText('frontenduserprofilegrow_WAR_growthemeuserprofile');
        });

        // [jasmine-jquery] The page has the intended Bootstrap layout classes
        it('has the intended layout', function() {
            expect($('aside')).toHaveClass('col-md-3');
            expect($('section')).toHaveClass("col-md-9");
        });
    });

    describe('Activities portlet', function() {

        // [jasmine-jquery] Activities portlet is present on page
        it('is present on page', function() {
            expect('#portlet_com_liferay_social_activities_web_portlet_SocialActivitiesPortlet').toBeInDOM();
        });

        //  [jasmine] Compares logged user's first name and name appearing in the Activities portlet
        it('is relevant for the currently logged user', function() {
            // Get currently logged user name from URL
            var pageUrl = window.location.href;
            var urlUserName = pageUrl.substring(pageUrl.lastIndexOf("/") + 1, pageUrl.lastIndexOf(".")).toLowerCase();

            // Get Logged user name from Activities portlet's header
            var activitiesPortletHeader = $('th').text();
            var activitiesPortletUserName = activitiesPortletHeader.slice(1, activitiesPortletHeader.indexOf("'")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            // Check for strings equality
            expect(urlUserName).toEqual(activitiesPortletUserName);
        });

        // [jasmine-jquery]
        it('has preview text with 16px font size', function() {
            expect($('h6')).toHaveCss({
                "font-size": "16px;"
            });
        });

        // [jasmine-jquery]
        it('has views text with 12px font size', function() {
            expect($('h6 > span')).toHaveCss({
                "font-size": "12px;"
            });
        });

        // [jasmine-jquery]
        it('shows the icons next to the actions for the Wiki articles', function() {
            expect($('i[class$="activities-icon"]')).toBeVisible();
        });

        // [jasmine-jquery]
        // This spec will only run of at least one Wiki tag container element is on the page
        it('has visible tags', function() {
            var tagContainer = $('.badge.badge-default.badge-sm');

            if (tagContainer.length > 0) {
                expect(tagContainer).toBeVisible();
            } else {
                alert("No tags on Activities were found. This may be either because: \n\n- No Wiki in the Activities portlet has assigned tags\n\n-There is an actual issue with tags not being displayed");
            }
        });

        // [jasmine] Checks the current URL + /web/ and compares it to the URLs in the Activities portlet
        it('has hyperlinks pointing to valid URLs', function() {
            var siteURL = window.location.protocol + "//" + window.location.host; // get current site
            var wikis = $('strong').find('a');

            wikis.each(function() {
                var wikiHrefs = $(this).attr('href'); // get Wiki URLs
                var wikiTrimmedHrefs = wikiHrefs.slice(0, wikiHrefs.indexOf("/welcome")); // trim Wiki urls to site URL

                expect(wikiTrimmedHrefs).toEqual(siteURL); // compare Wiki site with current site
            });
        });
    });

    describe('Activity selector', function() {

        // [jasmine-jquery]
        it('is present on page', function() {
            expect('#_com_liferay_social_activities_web_portlet_SocialActivitiesPortlet_user-activity-selector').toBeInDOM();
        });

        // [jasmine][jasmine-jquery] Checks if the Activity selector function fires upon change event
/*        it('calls filterByActivityType function on Activity selector change event', function() {

            spyOn(window, 'filterByActivityType'); // This function can be found at: OWXP/modules/social-activity-customizer/social-activity-customizer-core-jsp/src/main/resources/META-INF/jsps/html/taglib/ui/social_activities/page.jsp

            $("#_com_liferay_social_activities_web_portlet_SocialActivitiesPortlet_user-activity-selector").trigger('change');

            expect(window.filterByActivityType).toHaveBeenCalled();
        });*/
    });

    describe('Grow Subscriber portlet', function() {

        // [jasmine-jquery] Grow Subscriber portlet is on page
        it('is present on page', function() {
            expect('#p_p_id_com_liferay_owxp_subscribe_portlet_OWXPSubscribePortlet_').toBeInDOM();
        });
    });

    describe('User Card', function() {

        // [jasmine-jquery] User Card is on page
        it('is present on page', function() {
            expect('#userCard').toBeInDOM();
        });

        // [jasmine-jquery]
        it('has the right spacing and appears on the left', function() {
            expect('#userCard').toHaveClass("col-md-3");
            expect('#userCard').toHaveCss({
                "float": "left;"
            });
        });

        // [jasmine] Compares URL of Loop logo and https://loop.liferay.com/web/guest/home/-/loop/people/_
        it('has hyerlink that leads to a relevant Loop URL', function() {
            var loopHref = $('.loop-icon').attr('href');
            var loopTrimmedHref = loopHref.slice(0, loopHref.indexOf("_") + 1);

            expect(loopTrimmedHref).toEqual('https://loop.liferay.com/web/guest/home/-/loop/people/_');
        });

    });
}());