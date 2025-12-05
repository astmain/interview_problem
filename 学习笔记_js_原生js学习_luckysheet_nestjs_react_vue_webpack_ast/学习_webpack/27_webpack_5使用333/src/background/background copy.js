console.log('111>background:', 333)



// https://www.junchenlun.com/login.html


let ARR_url = [
    { id: 1, name: '君臣论', url: 'https://www.junchenlun.com/user/oatool/index' },
    { id: 2, name: '百度', url: 'https://www.baidu.com' },


]


// for (let index = 0; index < ARR_url.length; index++) {
//     const item = ARR_url[index];
//     chrome.contextMenus.create({
//         type: "radio", title: item.name,
//         onclick: function () {
//             window.open(item.url)
//         }
//     });
// }


// chrome.contextMenus.create({
//     id: 'foo',
//     title: 'first',
//     contexts: ['browser_action'],
//     onclick: function () {
//       alert('first')
//     }
//   })


console.log('111>222:', chrome.contextMenus.create)

// chrome.contextMenus.create(
//  {}
//   )


chrome.contextMenus.create({
    id: 'foo',
    title: 'first111111111111111',
    contexts: ['all']
})

function contextClick(info, tab) {
    const { menuItemId } = info
    console.log('111>info:', info)
    console.log('222>tab:', tab)

    if (menuItemId === 'foo') {
        console.log('333>222:', "foofoofoo")
    }
}

chrome.contextMenus.onClicked.addListener(contextClick)






























