console.log('index.js文件被加载了~');

// import { mul } from './test';

document.getElementById('btn').onclick = function() {
  // 懒加载~：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件 
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};

/**
 * example
 * 普通加载：一次性获取当前页面的所有数据，并渲染出来。
 * 懒加载：只获取首次打开必须用到的数据，渲染对应的功能。其余的在用户点击再渲染或执行对应的代码。目的是优化首屏或某页面首次打开的速度。
 * 预加载：在普通加载的基础上，当客户端空闲时，加载用户可能会用到的资源，如：用户在浏览搜索结果第一页内容时，加载第二页搜索的内容，加载好后，用户打开第二页就跟电脑上打开记事本一样快。目的是给用户极致的使用体验。
 */
