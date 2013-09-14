// Click on a user displays its full profile
$('.birthdayUser').click(function () {
    id = $(this).attr('id');
    searchUser(id);
});