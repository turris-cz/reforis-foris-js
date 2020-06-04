Sooner or later you will face with situation when you want/need to make some changes in the library.
Then the most important tool for you it's [`npm link`](https://docs.npmjs.com/cli/link).

Please, notice that it will not work if you link library just from root of the repo. It happens due to location of 
sources `./src`. You need to pack library first `make pack` and then link it from `./dist` directory.

Yeah it's not such comfortable solution for development. But it can fixed by writing small script similar as `make pack`
but with linking every file and directory from `./src` to the some directory and linking then from it. Notice that you
need to link `package.json` and `package-lock.json` as well.

So step by step:

```bash
make pack;
cd dist;
npm link;

cd $project_dir/js # Navigate to JS directory of the project where you want to link the library
npm link foris
```

And that's it ;)
