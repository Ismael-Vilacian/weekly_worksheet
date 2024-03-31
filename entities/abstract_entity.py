from abc import ABC, abstractmethod
from database_controller import database

class AbstractEntity(ABC):
    def __init__(self):
        self.database_controller = database()
        
        if not self.table_exists():
            self.create_table()

    @abstractmethod
    def table_name(self):
        pass

    def create_table(self):
        properties_name = self.map_properties(True)
        self.database_controller.create_table(properties_name, self.table_name())

    def add_item(self):
        properties_name = self.map_properties()
        values_properties = self.map_values_properties()
        self.database_controller.add_item(values_properties, properties_name, self.table_name())

    def table_exists(self):
        return self.database_controller.table_exists(self.table_name())

    def map_properties(self, use_id=False):
        instance = AbstractEntity()
        property = ""
        for property, value in vars(instance).items():
            if use_id and property == 'id':
                continue
            property += f"{property}, "

        return property[:-2]
    
    def map_values_properties(self, use_id=False):
        instance = AbstractEntity()
        property = ""
        for property, value in vars(instance).items():
            if use_id and property == 'id':
                continue
            property += f"{value}, "

        return property[:-2]