from tkinter import *

class Interface_assembler:
    def __init__(self, master=None):
        self.widget1 = Frame(master)
        self.widget1.pack()
        self.msg = Label(self.widget1, text="Primeiro widget")
        self.msg.pack ()
        pass

root = Tk()
Interface_assembler(root)
root.mainloop()