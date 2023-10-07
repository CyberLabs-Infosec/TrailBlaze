from random import seed, shuffle
from flag import FLAG

seed(0x1337)

flag_list = list(FLAG)
shuffle(flag_list)

shuffled_flag = ''
for i in range(len(FLAG)):
    shuffled_flag += flag_list[i].encode().hex()

print(f"Modified flag is: {shuffled_flag}")

