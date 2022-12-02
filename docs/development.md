Sooner or later, you will face with situation when you want/need to make some
changes in the library. Then the most important tool for you it's the
[`npm link`](https://docs.npmjs.com/cli/link).

Please, notice that it will not work if you link the library just from the root
of the repo. It happens due to the location of sources `./src`. You need to pack
the library first, `make pack` and then link it from the `./dist` directory.

Yeah, it's not such a comfortable solution for development. But it can be fixed
by writing a small script similar to making a pack but by linking every file and
directory from `./src` to the same directory and linking then from it. Notice
that you need to link a `package.json` and a `package-lock.json` as well.

So step by step:

```bash
make pack;
cd dist;
npm link;

cd $project_dir/js # Navigate to JS directory of the project where you want to link the library
npm link foris
```

And that's it ;)
