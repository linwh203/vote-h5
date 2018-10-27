/**
 * Created by linwh on 2017/6/19.
 */

// http://hcp-sh-wechat.hcpackaging.com/Ajax/Product/query/Vote.htm?activityID=1&urUnioniD=hunk&voteNumber=pic1
// http://hcp-sh-wechat.hcpackaging.com/Ajax/Product/create/Vote.htm?activityID=1&urUnioniD=hunk&voteNumber=pic1&IP=10.16.10.16
const apiHost = process.env.NODE_ENV=='production'? process.env.API_ROOT:'/api';;

module.exports = Object.assign({}, {
    list: `${apiHost}/Ajax/Product/query/Vote.htm`,
    vote: `${apiHost}/Ajax/Product/create/Vote.htm`
});
