Sinon 入门,看这篇文章就够了
----

# 为什么需要Sinon
当我们在开发前端项目的时候, 很多时候需要根据后端返回的数据来渲染页面, 我们通常使用AJAX发送请求给服务端。当我们开发后端逻辑的时候有时候需要连接数据库,根据从数据库中得到的数据来执行后续的逻辑代码, 或者其他的依赖, 甚至会更加复杂棘手。这些开发都存在一个共同的局限性, 就是会去依赖别的服务, 需要别的系统的支持。 例如, 如果我们使用Ajax请求网络, 您需要有一个服务器来响应对应的请求。对于数据库, 您需要有一个为测试设置的测试数据库。
  
所有这些都意味着编写和运行测试更加困难, 因为您需要做额外的工作来准备和设置一个测试成功的环境。
值得庆幸的是, 我们可以用sinon.js避免所有麻烦。我们可以利用它的特性将上面的例子简化为几行代码。

然而, 第一次接触`spies`, `stub`, `mock`可能棘手。它可能很难选择什么时候用什么功能。它们也有一些问题，所以你需要知道你应该用什么功能解决什么样的问题。
在这篇文章中将向你展示`spies`, `stub`, `mock`何时以及如何使用它们，并给你一套最佳实践，帮助您避免常见的陷阱.

# 什么是Sinon
  `Sinon`具有独立的spies, stub, mock功能,`Sinon`并不是独立的测试框架,它只是在测试中提供了上述的三种功能, 例如我们常用的测试框架`Mocha`,`Sinon`并不能完全替代`Mocha`的功能。

`Sinon`通过所谓的测试替代(`test-double`)轻松消除测试的复杂度,
测试替代，顾名思义，测试中用到的是真实代码逻辑的替代品。回过头来看Ajax示例，我们不需要设置服务器，而是用Ajax的替代代码，我们把Ajax的逻辑替换成不需要通过请求服务器就返回预先设置好的数据，这听起来有不可思议，但是基本概念很简单。因为JavaScript是动态的，所以我们可以在调用某个方法的时候使用任何函数来替换它。在`Sinon`中们可以用一个测试逻辑取代任何JavaScript函数，然后让测试复杂的事情变的简单化。

## spies的概念
顾名思义，`spies`我们干脆就把它称作间谍函数好了，间谍函数是`Sinon`最简单的部分，其它的功能都是建立在`spies`之上的，`spies`的主要用途是收集有关函数调用的信息。您还可以使用它们来帮助验证事物，例如是否调用了函数等。就像电影《窃听风云》中一样，监听房间内都有那些人进出，做了什么事，而且这个监听过程是不会房间内的人感知的。同样`spies`的实现监听的基础上是不会影响函数本身的正常调用(被监听的函数的上下文关系不会被影响)。当然我们实现是需要在`房间里偷偷的安装窃听器`的, 那么`spies`的窃听器是如何实现的呢？后文我们有介绍

## stub的概念
他们拥有`spies`的所有功能，不是监视某个函数的调用情况，而是完全取代了这个函数。换句话说，当使用`spies`时，原始函数仍然运行，但是当使用`stub`时，函数将不具有原始的功能，而是替换后的函数。

## mock的概念
`mock`与`stub`的功能一样都是用来替换指定的函数，如果你想替换掉一个对象中的多个方法，这时`mock`就可以发挥作用了，但是如果仅仅是替换对象中的一个函数，那么`stub`更加简单易用，当我们使用`mock`的时候应该十分小心，因为大量的替换原有代码逻辑，会导致test变的`脆弱`，

-----

# Sinon的使用场景
## spies
正如名字所暗示的，`spies`被用来获取关于函数调用的信息。例如，一个`spies`可以告诉我们调用一个函数的次数、每次调用的参数、返回的值、抛出的错误等。因此，当测试的目的是验证发生的事情时，间谍是一个很好的选择。结合`Sinon`的说法，我们可以通过一个简单的`spies`检查不同的结果。

间谍最常见的场景包括：

- 检查函数被调用了多少次
```
it('should call save once', function() {
  var save = sinon.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  save.restore();
  sinon.assert.calledOnce(save);
});
```
- 检查传递给函数的参数
```
it('should pass object with correct values to save', function() {
  var save = sinon.spy(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```
## stub
存根就像间谍，除了它们替换目标功能。它们还可以包含自定义行为，例如返回值,或抛出异常。他们甚至可以自动调用作为参数提供的任何回调函数。

存根有几个常用的用途：

- 您可以使用它们来代替有问题的代码段
- 您可以使用它们来触发不会触发的代码路径，例如错误处理
- 您可以使用它们来帮助测试异步代码更容易
- 存根可用于替代有问题的代码，即使写入测试困难的代码。这通常是外部网络连接，数据库或其他非JavaScript引起的。这些问题是它们经常需要手动设置。例如，在运行测试之前，我们需要填写一个带有测试数据的数据库，这使得运行和写入更复杂。
```
it('should pass object with correct values to save', function() {
  var save = sinon.stub(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});

```
通过用stub替换与数据库相关的功能，我们不再需要实际的数据库进行测试。 几乎任何情况下，类似的方法都可以用于其他难以测试的代码。

存根也可用于触发不同的代码路径。 如果我们测试的代码调用另一个函数，我们有时需要测试它在异常条件下的行为, 我们可以使用存根从代码中触发错误:
```
it('should pass the error into the callback if save fails', function() {
  var expectedError = new Error('oops');
  var save = sinon.stub(Database, 'save');
  save.throws(expectedError);
  var callback = sinon.spy();

  setupNewUser({ name: 'foo' }, callback);

  save.restore();
  sinon.assert.calledWith(callback, expectedError);
});
```
## mock
主要用于当你存根的时候想验证多个具体的行为时

例如，以下是我们如何使用`mock`验证更具体的数据库保存方案：
```
it('should pass object with correct values to save only once', function() {
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };
  var database = sinon.mock(Database);
  database.expects('save').once().withArgs(expectedUser);

  setupNewUser(info, function() { });

  database.verify();
  database.restore();
});
```
# Sinon的实现原理
## spies
```
const sinon = {
  spyObjs: {},
  spy: function(obj, method) {
    const self = this;
    this.spyObjs['spy#:' + (Object.keys(self.spyObjs).length + 1)] = {}
    this.proxy(obj, method);
  }, proxy: function(obj, method) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, method);
    const delegateFlag = 'spy#:' + Object.keys(sinon.spyObjs).length;
    this.spyObjs[delegateFlag] = {
      delegateValue: descriptor.value,
      delegateObject: obj
    }
    Object.defineProperty(obj, method, Object.getOwnPropertyDescriptor(this, 'invoke'))
  }, invoke: function(name) {
    console.log('参数%s, 被调用了', name)
    const delegateFlag = 'spy#:' + Object.keys(sinon.spyObjs).length;
    sinon.spyObjs[delegateFlag].delegateValue.apply(sinon.spyObjs[delegateFlag].delegateObject)
  }
}

var testFlag = {
  sayHello: function(name) {
    console.log('Hello:%s', name)
  }, whoAmI: function() {
    this.sayHello('bugall')
    console.log('Who am i')
  }
}
sinon.spy(testFlag, 'whoAmI');

testFlag.whoAmI('bugall')
```
## stub
## mock


## 
