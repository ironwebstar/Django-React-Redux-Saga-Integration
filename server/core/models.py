from django.db import models


class BaseModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def short_name(self):
        return self.__class__.__name__

    def __unicode__(self):
        return u"#%s %s" % (self.pk, self.short_name())

    def __str__(self):
        return self.__unicode__()

    def update_fields(self, **kwargs):
        """
        Bulk updates model instance attributes
        :raises: KeyError if the key does not exist
        """

        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
            else:
                raise KeyError(
                    f"Failed to update non existing attribute {self.__class__.__name__}.{key}"
                )


# Create your models here.
class Client(BaseModel):
    client_name = models.CharField(max_length=255, unique=True)
    street_name = models.CharField(max_length=255)
    suburb = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    state = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=20)

    class Meta:
      verbose_name = "Client"
      verbose_name_plural = verbose_name

    def __str__(self):
        return self.client_name

