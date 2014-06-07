/**
 * ManageAccount - UI for account management
 *
 * @author Blake Callens <blake@pencilblue.org>
 * @copyright PencilBlue 2014, All rights reserved
 */
function ManageAccount(){}

//inheritance
util.inherits(ManageAccount, pb.FormController);

ManageAccount.prototype.render = function(cb) {
	var self = this;

    var dao = new pb.DAO();
    dao.loadById(self.session.authentication.user_id, 'user', function(err, user) {
        if(util.isError(err) || user === null) {
            self.redirect(pb.config.siteRoot, cb);
            return;
        }

        delete user.password;

        var navigation = [
            {
                id: 'account',
                active: 'active',
                title: self.ls.get('ACCOUNT'),
                icon: 'user',
                href: '#',
                dropdown: true,
                children:
                [
                    {
                        id: 'manage',
                        active: 'active',
                        title: self.ls.get('MANAGE_ACCOUNT'),
                        icon: 'cog',
                        href: '/user/manage_account',
                    },
                    {
                        id: 'change_password',
                        title: self.ls.get('CHANGE_PASSWORD'),
                        icon: 'key',
                        href: '/user/change_password',
                    }
                ]
            }
        ];

        var pills = [
            {
                name: 'manage_account',
                title: self.ls.get('MANAGE_ACCOUNT'),
                icon: 'refresh',
                href: '/user/manage_account'
            }
        ];

        var tabs = [
            {
                active: 'active',
                href: '#account_info',
                icon: 'cog',
                title: self.ls.get('ACCOUNT_INFO')
            },
            {
                href: '#personal_info',
                icon: 'user',
                title: self.ls.get('PERSONAL_INFO')
            }
        ];

    	self.setPageName(self.ls.get('MANAGE_ACCOUNT'));
        self.ts.registerLocal('image_title', self.ls.get('USER_PHOTO'));
        self.ts.registerLocal('uploaded_image', (user.photo ? user.photo : ''));
    	self.ts.load('user/manage_account', function(err, result) {

            result = result.split('^angular_script^').join(pb.js.getAngularController(
            {
                navigation: navigation,
                pills: pills,
                tabs: tabs,
                user: user
            }));

            cb({content: result});
        });
    });
};

//exports
module.exports = ManageAccount;
