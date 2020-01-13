import os


for entry in os.scandir("."):
   if entry.is_dir():
       print(entry.name)
       os.system(f"msgmerge /home/mcjlnrtwcz/Repositories/reforis/reforis/translations/{entry.name}/LC_MESSAGES/messages.po forisjs.pot -o {entry.name}/LC_MESSAGES/forisjs.po")
